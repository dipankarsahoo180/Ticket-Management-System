public class GetMapLocation {
    static public void getLongitde_Latitude(){
        String address;
        address = 'huron consulting group india';
        address = EncodingUtil.urlEncode(address, 'UTF-8');
        
        // build callout
        Http h = new Http();        
        HttpRequest req = new HttpRequest();
        
	String yourAPiKey = 'AIzaSyBcg-OVlL_usmhT70N-GsIJhNKhiJb5uy0'; // Enter your Api key which you have created in google api console
        String key = '&key=' + yourAPiKey;
        String endPoint = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;
		
        req.setEndpoint(endPoint + key);
        req.setMethod('GET');
        req.setTimeout(5000);
        System.debug('Request ' + req);
        try{
            // callout
            HttpResponse res = h.send(req);
            // parse coordinates from response
            JSONParser parser = JSON.createParser(res.getBody());
            system.debug('Response get Body ' + res.getBody());
            
            double lat = null;
            double lon = null;
            //system.debug(parser.nextToken());
            while (parser.nextToken() != null) {  
                system.debug(parser.getCurrentToken());
                system.debug(JSONToken.FIELD_NAME);
                if ((parser.getCurrentToken() == JSONToken.FIELD_NAME) &&
                    (parser.getText() == 'location')){
                       // system.debug('a');
                        parser.nextToken(); // object start                     
                        while (parser.nextToken() != JSONToken.END_OBJECT){
                            String txt = parser.getText();
                            parser.nextToken();
                            if (txt == 'lat')
                                lat = parser.getDoubleValue();
                            else if (txt == 'lng')
                                lon = parser.getDoubleValue();
                        }
                    }
            }
            // update coordinates if we get back
            system.debug(lat);
            if (lat != null){
                system.debug(lat+' '+lon);              
            }
        }
        catch (Exception e) {
            system.debug(e);
        }
    }
}