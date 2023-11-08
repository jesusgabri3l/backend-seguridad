import crypto from "crypto";
import { cipherRegex, decipherRegex } from "./cryptoValidation.js";
import { log } from "console";

const encrypt = async (cipherRequest) => {
    const { error } = cipherRegex.validate(cipherRequest);

    if (error) {
        return {
            ok: false,
            message: "Invalid request",
            error: error.details[0].message,
        };
    }

    const { text, key } = cipherRequest;

    const algorithm = "aes-256-cbc";
    const keyCripto = crypto.createHash("sha256").update(key).digest("hex");
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(keyCripto, "hex"),
        iv
    );

    let textEncrypted = cipher.update(text);

    textEncrypted = Buffer.concat([textEncrypted, cipher.final()]);
    textEncrypted = iv.toString("hex") + ":" + textEncrypted.toString("hex");

    return { ok: true, message: "OK", textEncrypted };
};

const decrypt = async (decipherRequest) => {
    const { error } = decipherRegex.validate(decipherRequest);

    if (error) {
        return {
            ok: false,
            message: "Invalid request",
            error: error.details[0].message,
        };
    }

    const { text, key } = decipherRequest;

    const algorithm = "aes-256-cbc";
    const keyCripto = crypto.createHash("sha256").update(key).digest("hex");
    const ivExtract = text.split(":");
    const iv = Buffer.from(ivExtract.shift(), "hex");

    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(keyCripto, "hex"),
        iv
    );

    const encryptedText = Buffer.from(ivExtract.join(":"), "hex");
    let textDecrypted = decipher.update(encryptedText);

    try {
        textDecrypted = Buffer.concat([textDecrypted, decipher.final()]);
        textDecrypted = textDecrypted.toString();
    } catch (e) {
        return {
            ok: false,
            message: "The text entered does not correspond to this key",
            error: e.reason,
        };
    }

    return { ok: true, message: "OK", textDecrypted };
};

export { encrypt, decrypt };
