
import { Settings } from '../index'
import { HTTP } from './http'
import { WebEvent, WebIssue, WebProject, WebOrganization } from './schema'


export class Sentry {
    http: HTTP
    settings: Settings

    constructor(settings: Settings) {
        this.settings = settings
        this.http = new HTTP('https://sentry.io/api/0', this.settings.token)
    }

    /**
     * Returns a Sentry organization information.
     *
     * @param org - identifier or slug for an organization.
     */
    async organization(org: string): Promise<any> {
        try {
            const r = await this.http.get(`/organizations/${org}/`)
            return r.json() ?? r.text
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Returns details of an individual project.
     * 
     * @param org - identifier or slug for an organization.
     * @param proj - identifier or slug for a project.
     */
    async project(org: string, proj: string): Promise<any> {
        try {
            const r = await this.http.get(`/projects/${org}/${proj}/`)
            return r.json() ?? r.text
        } catch (e) {
            console.error(e)
        }
    }

    /**
    * Returns all issues for a project.
    *
    * @param org - identifier or slug for an organization.
    * @param proj - identifier or slug for a project.
    */
    async issues(org: string, proj: string): Promise<any> {
        try {
            const r = await this.http.get(`/projects/${org}/${proj}/issues/`)
            return r.json() ?? r.text
        } catch (e) {
            console.error(e)
        }
    }
}
