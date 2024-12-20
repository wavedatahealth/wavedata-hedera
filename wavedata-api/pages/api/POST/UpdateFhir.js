import {  ContractFunctionParameters } from '@hashgraph/sdk';

export default async function handler(req, res) {
	try {
		let FixCors = await import("../../../contract/fixCors.js");
		await FixCors.default(res);
	} catch (error) {}

	let useContract = await import("../../../contract/useContract.ts");
	const {contract, signerAddress, sendTransaction, ReadContractByQuery} = await useContract.default();

	if (req.method !== "POST") {
		res.status(405).json({status: 405, error: "Method must have POST request"});
		return;
	}
  const headers = {
		"accept": "application/fhir+json",
		"x-api-key": "FLD8rH3oH574iF4tmRdLo4hUBWEzooD23yr3RxTd"
	};

	const {userid, givenname, identifier, patientid,walletaddress} = req.body;
	let patient_details = await (await fetch(`https://fhir.kecqr0ds8j10.workload-prod-fhiraas.isccloud.io/Patient/${Number(patientid)}`, {headers})).json();
	let diagnostic_details = await (await fetch(`https://fhir.kecqr0ds8j10.workload-prod-fhiraas.isccloud.io/DiagnosticReport?patient=${Number(patientid)}`, {headers})).json();
	let allDiagnostic = await diagnostic_details.entry;

	
	let DiseasesDiagnostic = allDiagnostic[allDiagnostic.length - 1]["resource"]["presentedForm"][0]["data"];
	
	let decodedDisease = useContract.base64DecodeUnicode(DiseasesDiagnostic);

	let paramsTrans = new ContractFunctionParameters()
	.addUint256(Number(userid))
	.addString(walletaddress)
	.addString(patient_details["name"][0]['family'])
	.addString(givenname)
	.addString(identifier)
	.addString(patient_details["telecom"][0]["value"].toString())
	.addString(patient_details["gender"])
	.addString(patient_details["birthDate"])
	.addString(decodedDisease)
	.addString(patientid);


	await sendTransaction( "UpdateFhir",paramsTrans);


	res.status(200).json({status: 200, value: "Updated!",bodies: [Number(userid),walletaddress, patient_details["name"][0]['family'], givenname, identifier, patient_details["telecom"][0]["value"].toString(), patient_details["gender"], patient_details["birthDate"], decodedDisease, patientid]});
}
