import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AnotherWebPartWebPart.module.scss';
import * as strings from 'AnotherWebPartWebPartStrings';
import { ICounterService, CounterServieKey } from '../../CounterService';


export interface IAnotherWebPartWebPartProps {
  description: string;
}

export default class AnotherWebPartWebPart extends BaseClientSideWebPart<IAnotherWebPartWebPartProps> {


  private counterService: ICounterService;
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.context.serviceScope.getParent().getParent().whenFinished(() => {
        this.counterService = this.context.serviceScope.getParent().getParent().consume(CounterServieKey);
        resolve();
      });
    });
  }
  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.anotherWebPart}">
        <div class="${ styles.container}">
          <div class="${ styles.row}">
            <div class="${ styles.column}">
                <span class="${ styles.title}"><b>B</b> counter is ${this.counterService.getCount()}!</span>
            </div>
          </div>
        </div>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
