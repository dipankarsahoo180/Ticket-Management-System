import { LightningElement,track, api} from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';
//import fetchDataHelper from './fetchDataHelper';
// const columns = [
//     {
//         label: 'First Name',
//         fieldName: 'FirstName'
//     }, {
//         label: 'Last Name',
//         fieldName: 'LastName'
//     }, {
//         label: 'Email',
//         fieldName: 'Email',
//         type: 'email'

//     }
// ];

export default class ApexImperativeMethodWithParams extends LightningElement {
    searchKey = '';
    contacts;
    error;
    firstName = '';
    lastName = '';
    email = '';

    handleKeyChange(event) {
        //this.searchKey = event.target.value;
        //console.log(this.searchKey);
        const field = event.target.name;
        if (field === 'firstName') {
            this.firstName = event.target.value;
            console.log("first name");
            console.log(this.firstName);
        } else if (field === 'lastName') {
            this.lastName = event.target.value;
            console.log("last name");
            console.log(this.lastName);
        }else if(field === 'email'){
            this.email = event.target.value;
            console.log("email");
            console.log(this.email);
        }
    }
    // handleChange(event) {
    //     const field = event.target.name;
    //     if (field === 'firstName') {
    //         this.firstName = event.target.value;
    //     } else if (field === 'lastName') {
    //         this.lastName = event.target.value;
    //     }else if(field === 'email'){
    //         this.email = event.target.value;
    //     }
    // }

    handleSearch() {
        findContacts({ firstName: this.firstName, lastName: this.lastName,email: this.email })
            .then((result) => {
                console.log("this is under findcontact  "+result);
                this.contacts = result;
                console.log(this.contacts);
                this.error = undefined;
            })
            .catch((error) => {
                console.log("this is under error part "+error);
                this.error = error;
                this.contacts = undefined;
            });
    }

    // @wire(findContacts, { firstName: this.firstName, lastName: this.lastName,email: this.email })
    // contacts(result) {
    //     this.refreshTable = result;
    //     if (result.data) {
    //         this.data = result.data;
    //         this.error = undefined;

    //     } else if (result.error) {
    //         this.error = result.error;
    //         this.data = undefined;
    //     }
    // }
    // async connectedCallback() {
    //     const data = await fetchDataHelper({ amountOfRecords: 100 });
    //     this.data = data;
    // }
}