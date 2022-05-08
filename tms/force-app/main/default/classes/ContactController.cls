public with sharing class ContactController {
    @AuraEnabled
    public static List<TMS_Contact__c> findContacts(String firstName,String lastName,String email) {
        String fkey = '%' + firstName + '%';
        String lkey = '%' + lastName + '%';
        String emailkey = '%' + email + '%';
        return [
            SELECT Id, 	First_Name__c,Last_Name__c, Email_Address__c
            FROM TMS_Contact__c
            WHERE First_Name__c LIKE :fkey and Last_Name__c LIKE :lkey and Email_Address__c LIKE :emailkey
        ];
    }
}