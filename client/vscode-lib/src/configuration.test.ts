import type { ClientConfiguration } from '@openctx/client'
import { describe, expect, test, vi } from 'vitest'
import type * as vscode from 'vscode'
import { URI as vscodeUri } from 'vscode-uri'
import { getClientConfiguration } from './configuration.js'

vi.mock('vscode', () => ({
    workspace: {
        workspaceFile: vscodeUri.parse('file:///workspace/workspace.code-workspace'),
        getWorkspaceFolder: () => ({ uri: vscodeUri.parse('file:///workspace/subfolder') }),
    },
}))

describe('getClientConfiguration', () => {
    describe('openctx.providers', () => {
        test('rewrites relative file paths', () => {
            const mockGetConfiguration: typeof vscode.workspace.getConfiguration = () => ({
                get: () => null,
                has: () => {
                    throw new Error('not implemented')
                },
                update: () => {
                    throw new Error('not implemented')
                },
                inspect: () => ({
                    key: 'openctx.providers',
                    globalValue: {
                        './globalValue.js': true,
                        'https://example.com/globalValue': true,
                    } as any,
                    workspaceValue: { './workspaceValue.js': true } as any,
                    workspaceFolderValue: { './workspaceFolderValue.js': true } as any,
                    workspaceFolderLanguageValue: { './workspaceFolderLanguageValue.js': true } as any,
                }),
            })
            const scope = vscodeUri.parse('file:///a/b.ts')
            expect(getClientConfiguration(scope, mockGetConfiguration).providers).toStrictEqual<
                ClientConfiguration['providers']
            >({
                'https://example.com/globalValue': true,
                './globalValue.js': true,
                'file:///workspace/subfolder/.vscode/workspaceFolderLanguageValue.js': true,
                'file:///workspace/subfolder/.vscode/workspaceFolderValue.js': true,
                'file:///workspace/workspaceValue.js': true,
            })
        })
    })
})
