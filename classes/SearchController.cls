public with sharing class SearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> getAccounts(String name, Integer numberOfRecords){
        
        String searchParam = '%' + name + '%';
        String query ='';
        Integer numRecords = 10;
        if(numberOfRecords != null ) numRecords = numberOfRecords;
        if(name !=null && name !=''){
            query = 'SELECT Id,Name,Phone,Fax FROM Account WHERE Name LIKE :searchParam LIMIT :numRecords';
        }
        else{
            query = 'SELECT Id,Name,Phone,Fax FROM Account LIMIT 10';
        }
        System.debug('Query = '+query);
        List<sObject> accRecords = Database.query(query);
        return accRecords;  
    }
    
    @AuraEnabled(cacheable=true)
    public static list<sObject> getAccountBasedTypes(String accountType){
        System.debug('accountType = '+accountType);
        if(accountType != null && accountType !='' )
        {
            List<sObject> accRecords = [SELECT ID,Name,Phone,Industry,Type,Fax,Website,AccountNumber,CreatedById FROM Account WHERE Type =:accountType];
            System.debug('Results ===== = '+JSON.serialize(accRecords));
            return accRecords;
        }
        return null;
    }
    
}