import { LightningElement, wire, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';


export default class PicklistSearch extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    @track typeOptions;
    @track selectedValue;
    @track error;

    /* Wired method to get the Picklist values */
    @wire(getPicklistValues, { recordTypeId: '0122v000001SoE5', fieldApiName: ACCOUNT_TYPE })
    picklistValues({ data, error }) {
        if (data) {
            this.typeOptions = data.values;
            this.error = undefined;
        }
        if (error) {
            this.typeOptions = undefined;
            this.error = error;
        }
    }

    handleChange(event) {
        this.selectedValue = event.target.value;
    }
    
    handleClick(event) {
        const newLocal = 'picklistevent';
        this.dispatchEvent(new CustomEvent(newLocal, { detail: this.selectedValue }));
    }
}