package com.example.backend.Config;

import com.twilio.Twilio;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class TwilioConfig {

    @Value("${twilio.accountSid}")
    private String accountSid;

    @Value("${twilio.authToken}")
    private String authToken;

    @Value("${twilio.fromPhoneNumber}")
    private String fromPhoneNumber;

    public static String ACCOUNT_SID;
    public static String AUTH_TOKEN;
    public static String FROM_PHONE_NUMBER;

    // Initialize Twilio with values from application.properties
    public static void initializeTwilio() {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }

    // Set values on initialization from @Value
    @Value("${twilio.accountSid}")
    public void setAccountSid(String accountSid) {
        TwilioConfig.ACCOUNT_SID = accountSid;
    }

    @Value("${twilio.authToken}")
    public void setAuthToken(String authToken) {
        TwilioConfig.AUTH_TOKEN = authToken;
    }

    @Value("${twilio.fromPhoneNumber}")
    public void setFromPhoneNumber(String fromPhoneNumber) {
        TwilioConfig.FROM_PHONE_NUMBER = fromPhoneNumber;
    }
}
