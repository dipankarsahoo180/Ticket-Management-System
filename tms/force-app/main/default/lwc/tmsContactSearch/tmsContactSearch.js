import { LightningElement, track, wire } from 'lwc';
import tmsSearchResult from '@salesforce/apex/tmsContactSearch.tmsSearchResult';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
import { getRecord, createRecord, updateRecord, deleteRecord, getRecordUi, getFieldValue, getFieldDisplayValue, getRecordCreateDefaults, createRecordInputFilteredByEditedFields, generateRecordInputForCreate, generateRecordInputForUpdate } from 'lightning/uiRecordApi';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_lightning_ui_api_record */


const CustomField = [
    'TMS_Contact__c.First_Name__c', 'TMS_Contact__c.Last_Name__c', 'TMS_Contact__c.Email_Address__c'
]


export default class TmsContactSearch extends NavigationMixin(LightningElement) {
    @track FirstName;
    @track LastName;
    @track Email;
    @track createContactButtonClickAction = 'Click on the search button to get started';
    @track boolVisible = false;
    @track recordId;
    SearchResults;
    booleanSaveButtonDisable = true;

    @wire(getRecord, { recordId: '$recordId', fields: CustomField }) tmsContactRecord;
    ContactFirstNameChangeHandler(event) {
        this.FirstName = event.target.value;
    }
    ContactLastNameChangeHandler(event) {
        this.LastName = event.target.value;
    }
    ContactEmailChangeHandler(event) {
        this.Email = event.target.value;
    }

    handleClickOnSearch() {
        if (this.FirstName == null || this.LastName == null || this.Email == null ||
            this.FirstName == '' || this.LastName == '' || this.Email == '') {
            this.createContactButtonClickAction = 'Looks like you left one or more fields blank!';
            console.log('blank value');
            this.template.querySelector(".messagecolor").style="color:red;padding:10px;font-weight:bold;text-align: center;";
        }
        else {
            tmsSearchResult({ firstName: this.FirstName, lastName: this.LastName, email: this.Email })
                .then((result) => {
                    this.SearchResults = result;
                    console.log(this.SearchResults);
                    if (this.SearchResults.length == 0) {
                        this.booleanSaveButtonDisable = false;
                        this.createContactButtonClickAction = 'We have no records for this contact! Click to create one ';
                        this.template.querySelector(".messagecolor").style="color:blue;padding:10px;font-weight:bold;text-align: center;";
                    }
                    else {
                        this.boolVisible = false;
                        this.createContactButtonClickAction = 'Record Fetched sucessfully';
                        this.template.querySelector(".messagecolor").style="color:blue;padding:10px;font-weight:bold;text-align: center;";
                    }
                })
                .catch((error) => {
                    this.SearchResults = "Contacts Not Found";
                    console.log(error);
                })
        }

    }

    handleClickOnSave() {
        if (this.FirstName == null || this.LastName == null || this.Email == null ||
            this.FirstName == '' || this.LastName == '' || this.Email == '') {
            this.createContactButtonClickAction = 'All fields are mandatory to create a record!';
            this.template.querySelector(".messagecolor").style="color:red;padding:10px;font-weight:bold;text-align: center;";
        }
        else {
            const fields = {
                'First_Name__c': this.FirstName,
                'Last_Name__c': this.LastName,
                'Email_Address__c': this.Email,
                'Name': this.FirstName + ' ' + this.LastName,
            }
            const recordInput = { apiName: 'TMS_Contact__c', fields: fields };
            createRecord(recordInput).then(response => {
                this.recordId = response.id;
                this.createContactButtonClickAction = 'Contact created Succefully';
                this.template.querySelector(".messagecolor").style="color:blue;padding:10px;font-weight:bold;text-align: center;";
                this.boolVisible = true;
                this.booleanSaveButtonDisable = true;

            }).catch(error => {
                console.log(error.body);
                if (error.body.output.errors[0].errorCode == "DUPLICATE_VALUE") {
                    this.createContactButtonClickAction = 'Oops!!!The record already exists. Click on search button';
                    this.template.querySelector(".messagecolor").style="color:red;padding:10px;font-weight:bold;text-align: center;";
                }
            });
        }

    }

    get retrievefieldFirstName() {
        if (this.tmsContactRecord.data) {
            return this.tmsContactRecord.data.fields.First_Name__c.value;
        }
        else {
            return " ";
        }

    }


    get retrievefieldLastName() {
        if (this.tmsContactRecord.data) {
            return this.tmsContactRecord.data.fields.Last_Name__c.value;
        }
        else {
            return " ";
        }

    }

    get retrievefieldEmail() {
        if (this.tmsContactRecord.data) {
            return this.tmsContactRecord.data.fields.Email_Address__c.value;
        }
        else {
            return " ";
        }

    }
    viewTMSContact(event) {
        // Navigate to Account record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.recordId,
                "objectApiName": "TMS_Contact__c",
                "actionName": "view"
            },
        });
    }

    ViewEachContactRcordOnClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": event.target.value,
                "objectApiName": "TMS_Contact__c",
                "actionName": "view"
            },
        });
    }
}