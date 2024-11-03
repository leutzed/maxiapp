import xml2js from 'xml2js';

export function parseXML<Type>(xml: string): Promise<Type> {
    return new Promise<Type>((resolve, reject) => {
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
