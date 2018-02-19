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

export const CounterServieKey: ServiceKey<ICounterService> = ServiceKey.create<ICounterService>('WW:CounterService', CounterService);