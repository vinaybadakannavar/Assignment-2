import { LightningElement, track, api, wire } from 'lwc';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class RootParent extends LightningElement {
    @track picklistValue;
    @wire(CurrentPageReference) pageRef;

    get hasPicklist() {
        if (this.picklistValue) {
            return true;
        }
        return false;
    }

    handleContactSelected(data) {
        this.picklistValue = data;
    }

    handleEvent(event) {
        this.picklistValue = event.detail;
    }
}