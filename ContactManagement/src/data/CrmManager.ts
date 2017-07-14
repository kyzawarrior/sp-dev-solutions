import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { ICrmDataProvider } from '../dataProviders/ICrmDataProvider';

import MockCrmDataProvider from '../dataProviders/MockCrmDataProvider';
import SharePointCrmDataProvider from '../dataProviders/SharePointCrmDataProvider';


export default class CrmManager
{
    private _context: IWebPartContext;
    private _data: ICrmDataProvider;

	public get data(): ICrmDataProvider { return this._data; }

    constructor(context : IWebPartContext)
    {
        this._context = context;

        if (Environment.type == EnvironmentType.Local) 
        {
            this._data = new MockCrmDataProvider();
        }
        else
        {
            let spcrmdata = new SharePointCrmDataProvider();

            spcrmdata.httpClient = this._context.spHttpClient;
            
            spcrmdata.webUrl = this._context.pageContext.web.serverRelativeUrl;

            this._data = spcrmdata;
        }

        this._data.selectedOrganizationList = this._data.defaultOrganizationList;
        this._data.selectedPersonList = this._data.defaultPersonList;
        this._data.selectedTagList =  this._data.defaultTagList;

    }
}