
export default async function handler(req, res) {
  try {
    let FixCors = await import("../../../contract/fixCors.js");
    await FixCors.default(res);
  } catch (error) {}

  
  let useContract = await import("../../../contract/useContract.ts");
  const {contract,  ReadContractByQuery} = await useContract.default();
	
  const { email, password } = req.body;
	let output = await ReadContractByQuery(contract, ("Login"), [email, password]);
  res.status(200).json({ status: 200, value: output })

}
