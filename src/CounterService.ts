import { ServiceScope, ServiceKey } from '@microsoft/sp-core-library';

export interface ICounterService {
    getCount(): number;
}


export class CounterService implements ICounterService {
    private counter: number;

    constructor(serviceScope: ServiceScope) {
        this.counter = 0;
    }

    public getCount(): number {
        this.counter++;
        return this.counter;
    }
}
export const CounterServieKey = (scope: ServiceScope): ServiceKey<ICounterService> => {
    // if (!(<any>window).__serviceKey) {
    //     (<any>window).__serviceKey = ServiceKey.create<ICounterService>('WW:CounterService', CounterService);
    // }
    // return (<any>window).__serviceKey;
    let topScope = scope;
    const lastId = (<any>ServiceKey)._lastId;
    do {
        for (let i = 0; i <= lastId; i++) {
            try {
                let svc: any = (<any>topScope)._registrations[i];
                if (svc) {
                    if (svc.serviceKey.name == 'WW:CounterService') {
                        return svc.serviceKey;
                    }
                }
            } catch (err) {
                // nop
            }
        }
        topScope = topScope.getParent();
    }
    while (topScope)
    return ServiceKey.create<ICounterService>('WW:CounterService', CounterService);
};
//export const CounterServieKey: ServiceKey<ICounterService> = ServiceKey.create<ICounterService>('WW:CounterService', CounterService);