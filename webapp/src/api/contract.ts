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

export async function getLoacationMaizo() {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  const { gasRequired, result, output } = await contract.query.get(ALICE, {
    gasLimit: api?.registry.createType("WeightV2", {
      refTime: MAX_CALL_WEIGHT,
      proofSize: PROOFSIZE,
    }) as WeightV2,
    storageDepositLimit,
  });
  return output?.toHuman();
}

export async function transferFromMaizo(value: number, from: string, to: string) {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  const { gasConsumed, result, output } = await contract.tx
    .transferFrom(ALICE, {
      gasLimit: api?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    }, value, from, to)
    .signAndSend(ALICE);
  return output?.toHuman();
}



export async function postLocation() {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  const { gasConsumed, result, output } = await contract.tx
    .post(ALICE, {
      gasLimit: api?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    })
    .signAndSend(ALICE);
  return output?.toHuman();
}

export async function exChangeToken() {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  const { gasConsumed, result, output } = await contract.tx
    .post(ALICE, {
      gasLimit: api?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    })
    .signAndSend(ALICE);
  return output?.toHuman();
}

export async function totalySupply() {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  const { gasConsumed, result, output } = await contract.tx
    .total_supply(ALICE, {
      gasLimit: api?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    })
    .signAndSend(ALICE);
  return output?.toHuman();
}

export async function tokenChanges(value: number) {
  const provider = new WsProvider("wss://rpc.shibuya.astar.network");
  const api = await ApiPromise.create({ provider });
  const address = process.env.REACT_APP_ADDRESS as string;

  const contract = new ContractPromise(
    api,
    metadata,
    address
  );

  const { gasConsumed, result, output } = await contract.tx
    .tokenChange(ALICE, {
      gasLimit: api?.registry.createType("WeightV2", {
        refTime: MAX_CALL_WEIGHT,
        proofSize: PROOFSIZE,
      }) as WeightV2,
      storageDepositLimit,
    }, value)
    .signAndSend(ALICE);
  return output?.toHuman();
}

