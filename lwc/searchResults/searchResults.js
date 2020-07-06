import { LightningElement, track, wire, api } from 'lwc';
import getAccountBasedTypes from '@salesforce/apex/SearchController.getAccountBasedTypes'
import { registerListener, unregisterAllListeners, fireEvent, unregisterListener } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';



export default class SearchResults extends LightningElement {
    @api selectedType;
    @track copyOfAccountRecords;
    @track error;
    wiredAccountResults;

    @wire(CurrentPageReference) pageRef;
    /* Wired method to get the Account records */
    @wire(getAccountBasedTypes, { accountType: '$selectedType' })
    accRecords(result) {
        this.wiredAccountResults = result;
        if (result.data) {
            this.copyOfAccountRecords = result.data;
            this.error = undefined
        }
        if (result.error) {
            this.copyOfAccountRecords = undefined;
            this.error = result.error
        }
    }
    
    connectedCallback() {
        registerListener('refreshApex', this.handleRefresh, this);
    }
    disconnectedCallback() {
        unregisterListener('refreshApex');
    }
    
    handleRefresh() {
        return refreshApex(this.wiredAccountResults);
    }

}