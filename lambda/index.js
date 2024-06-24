const Alexa = require('ask-sdk-core');

const facts = {
    "es": [
        "En 1492, Colón llegó a América.",
        "La Gran Muralla China tiene más de 13,000 millas de longitud.",
        "El agua se expande cuando se congela.",
        "La Tierra tarda 365 días en orbitar el sol.",
        "Los pulpos tienen tres corazones.",
        "Las abejas pueden reconocer rostros humanos.",
        "El Monte Everest crece aproximadamente 4 milímetros cada año.",
        "Los caballitos de mar se aparean de por vida.",
        "Las cucarachas pueden vivir varias semanas sin cabeza.",
        "Un rayo es cinco veces más caliente que la superficie del sol."
    ],
    "en": [
        "In 1492, Columbus sailed the ocean blue.",
        "The Great Wall of China is over 13,000 miles long.",
        "Water expands when it freezes.",
        "The Earth takes 365 days to orbit the sun.",
        "Octopuses have three hearts.",
        "Bees can recognize human faces.",
        "Mount Everest grows approximately 4 millimeters every year.",
        "Seahorses mate for life.",
        "Cockroaches can live for several weeks without their heads.",
        "A lightning bolt is five times hotter than the surface of the sun."
    ]
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const speakOutput = language === 'es' ? 
            'Hola Josué. Bienvenido a Datos Curiosos. Puedes pedirme un dato curioso.' : 
            'Hello Josue. Welcome to Fun Facts. You can ask me for a fun fact.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const speakOutput = language === 'es' ? 
            'Hola, ¿quieres saber algún dato curioso? Solo dime, Cuéntame algo interesante.' : 
            'Hello, do you want to know a fun fact? Just say, Give me an interesting fact.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const GetRandomFactIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetRandomFactIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const factList = facts[language] || facts['en'];
        const randomFact = factList[Math.floor(Math.random() * factList.length)];

        const speakOutput = randomFact;
        const repromptText = language === 'es' ? '¿Quieres escuchar otro dato curioso?' : 'Do you want to hear another fun fact?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const speakOutput = language === 'es' ? 
            'Puedes pedirme un dato curioso diciendo, dime un dato curioso.' : 
            'You can ask me for a fun fact by saying, tell me a fun fact.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const speakOutput = language === 'es' ? '¡Adiós!' : 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const speakOutput = language === 'es' ? 
            'Lo siento, no sé sobre eso. Por favor, inténtalo de nuevo.' : 
            'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const language = locale.split('-')[0];
        const speakOutput = language === 'es' ? 
            'Lo siento, tuve problemas para hacer lo que pediste. Por favor, inténtalo de nuevo.' : 
            'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        GetRandomFactIntentHandler,
        HelpIntentHandler,
        HelloWorldIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/fun-facts/v1.0')
    .lambda();
