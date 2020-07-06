import { LightningElement, track ,wire} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/pubsub';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class LdsDetailComponent extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    isEditTrue = false;
    @track accountRecord;
    @track objectApiName ='Account';
    handleClick(){
        this.isEditTrue = true;
    }

    connectedCallback(){
        registerListener('accountSelected', this.handleContactSelected, this);
    }
    handleContactSelected(data){
        this.accountRecord = data;
    }

    handleSuccess(){
        const evt = new ShowToastEvent({
            title: 'Record Update',
            message: 'Record Update Success',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        this.isEditTrue =false;
        fireEvent(this.pageRef, 'refreshApex', true);
    }

    handleCancel(){
        this.isEditTrue =false;
    }

}