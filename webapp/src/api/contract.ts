import { ApiPromise, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import { BN, BN_ONE } from "@polkadot/util";
import type { WeightV2 } from "@polkadot/types/interfaces";
import "@polkadot/api-augment";
import metadata from "../config/metadata.json";

const ALICE = process.env.REACT_APP_ALICE as string;
const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);
const storageDepositLimit = null;

export async function Contract() {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  console.log("contract", contract);

  const { gasRequired, result, output } = await contract.query.getXy(ALICE, {
    gasLimit: api?.registry.createType("WeightV2", {
      refTime: MAX_CALL_WEIGHT,
      proofSize: PROOFSIZE,
    }) as WeightV2,
    storageDepositLimit,
  });

  console.log("output", output?.toHuman());
  console.log(result.toHuman());
  console.log(gasRequired.toHuman());
}
