import * as termMethods from "../repositories/termsRepository";

export async function getTerms() {
    const terms = await termMethods.getAllTerms();

    return terms;
}