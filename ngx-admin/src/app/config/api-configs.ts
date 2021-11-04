import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable(
    { providedIn: 'root' }
)
export class ApiConfig {
    public domain_image: string;
    public domain_api: string;
    public domain_v1: string;
   
    constructor(@Inject(DOCUMENT) private document: Document) {
        if (this.document.location.host.startsWith('v2-')) {
            this.domain_v1 = 'https://' + this.document.location.host.substring(3);
            this.domain_image = 'https://' + this.document.location.host.substring(3);
            this.domain_api = 'https://' + this.document.location.host.substring(3) + '/apiv2/';
        }
        else
            switch (this.document.location.host) {                
                case 'beta-hbt.skt-tech.com':
                    this.domain_v1 = 'https://hbt.skt-tech.com';
                    this.domain_image = 'https://hbt.skt-tech.com';
                    this.domain_api = 'https://hbt.skt-tech.com/apiv2/';
                    break;
                case 'localhost:4211':
                    this.domain_v1 = 'http://dev-hbt.skt-tech.com';
                    this.domain_image = 'http://dev-hbt.skt-tech.com';
                    this.domain_api = 'http://dev-hbt.skt-tech.com/apiv2/';
                    break;
                case 'localhost:4212':
                    this.domain_v1 = 'http://dev-hnb.skt-tech.com';
                    this.domain_image = 'http://dev-hnb.skt-tech.com';
                    this.domain_api = 'http://dev-hnb.skt-tech.com/apiv2/';
                    break;
                default:
                    this.domain_v1 = 'https://api-dev.skt-tech.com';
                    this.domain_image = 'https://api-dev.skt-tech.com';
                    this.domain_api = 'https://api-dev.skt-tech.com/apiv2/';
                break;
            }
    }
}