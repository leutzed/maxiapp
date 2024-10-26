export const parseXML = (xml) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
