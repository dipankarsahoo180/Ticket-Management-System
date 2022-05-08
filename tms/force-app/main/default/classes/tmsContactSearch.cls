public with sharing class tmsContactSearch {
    @AuraEnabled
    public static List<TMS_Contact__c> tmsSearchResult(String firstName, String lastName, String email){
        try {
            String fkey = firstName;
            String lkey =lastName;
            String emailkey =email;
            system.debug([
                SELECT Id, 	First_Name__c,Last_Name__c, Email_Address__c,(SELECT Id, First_Name__c,Last_Name__c,Severity__c FROM TMS_Tickets__r)
                FROM TMS_Contact__c 
                WHERE First_Name__c LIKE :fkey and Last_Name__c LIKE :lkey and Email_Address__c LIKE :emailkey
            ]);
            
            return [
                SELECT Id, 	First_Name__c,Last_Name__c, Email_Address__c,(SELECT Id, First_Name__c,Last_Name__c,Severity__c FROM TMS_Tickets__r)
                FROM TMS_Contact__c 
                WHERE First_Name__c LIKE :fkey and Last_Name__c LIKE :lkey and Email_Address__c LIKE :emailkey
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}