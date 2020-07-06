import { LightningElement,api,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';

export default class CardComponent extends LightningElement {
    @api accountRecord;
    @wire(CurrentPageReference) pageRef;


    handleClick(event){
        console.log('Fire inside Detail Click = ',this.accountRecord);
        fireEvent(this.pageRef, 'accountSelected', this.accountRecord);
    }
}