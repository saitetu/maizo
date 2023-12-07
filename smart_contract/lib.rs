#![cfg_attr(not(feature = "std"), no_std, no_main)]

use ink::prelude::{
    vec::Vec,
    string::String,
};
use ink::{
    Contract,
    env,
    storage::{
        self,
        mapping::Mapping,
    },
    traits::{
        Env,
        ContractEvent,
    },
};

mod Maizo {
    use super::*;

    #[derive(Default, scale::Encode, scale::Decode, Clone)]
    pub struct Locates {
        pub value: Vec<String>,
    }

    #[ink(storage)]
    #[derive(Default)]
    pub struct Maizo {
        pub total_supply: Balance,
        pub balances: Mapping<AccountId, Balance>,
        pub allowances: Mapping<(AccountId, AccountId), Balance>,
        pub locates: Locates,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        pub from: Option<AccountId>,
        #[ink(topic)]
        pub to: Option<AccountId>,
        pub value: Balance,
    }

    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        pub owner: AccountId,
        #[ink(topic)]
        pub spender: AccountId,
        pub value: Balance,
    }

    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        InsufficientBalance,
        InsufficientAllowance,
    }

    pub type Result<T> = core::result::Result<T, Error>;

    pub struct Locate {
        pub name: String,
        pub value: u32,
        pub image: String,
        pub lat: u32,
        pub lng: u32,
    }

    

    impl Maizo {
        #[ink(constructor)]
        pub fn new(total_supply: Balance) -> Self {
            let mut balances = Mapping::default();
            let caller = Self::env().caller();
            balances.insert(caller, &total_supply);
            Self::env().emit_event(Transfer {
                from: None,
                to: Some(caller),
                value: total_supply,
            });
            Self {
                total_supply,
                balances,
                allowances: Default::default(),
                locates: Locates::default(),
            }
        }

        #[ink(message)]
        pub fn total_supply(&self) -> Balance {
            self.total_supply
        }

        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> Balance {
            self.balance_of_impl(&owner)
        }

        #[ink(message)]
        pub fn allowance(&self, owner: AccountId, spender: AccountId) -> Balance {
            self.allowance_impl(&owner, &spender)
        }

        #[ink(message)]
        pub fn transfer(&mut self, to: AccountId, value: Balance) -> Result<()> {
            let from = self.env().caller();
            self.transfer_from_to(&from, &to, value)
        }

        #[ink(message)]
        pub fn approve(&mut self, spender: AccountId, value: Balance) -> Result<()> {
            let owner = self.env().caller();
            self.allowances.insert((&owner, &spender), &value);
            self.env().emit_event(Approval {
                owner,
                spender,
                value,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn get_randam(&mut self, value: Balance) -> u64 {
            let random_seed = env::block_number() as u64;
            let random_number = random_seed % value;

            random_number
        }

        #[ink(message)]
        pub fn transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            value: Balance,
        ) -> Result<()> {
            let caller = self.env().caller();
            let allowance = self.allowance_impl(&from, &caller);
            if allowance < value {
                return Err(Error::InsufficientAllowance)
            }
            self.transfer_from_to(&from, &to, value)?;
            self.allowances
                .insert((&from, &caller), &(allowance - value));
            Ok(())
        }

        fn transfer_from_to(
            &mut self,
            from: &AccountId,
            to: &AccountId,
            value: Balance,
        ) -> Result<()> {
            let from_balance = self.balance_of_impl(from);
            if from_balance < value {
                return Err(Error::InsufficientBalance)
            }

            self.balances.insert(from, &(from_balance - value));
            let to_balance = self.balance_of_impl(to);
            self.balances.insert(to, &(to_balance + value));
            self.env().emit_event(Transfer {
                from: Some(*from),
                to: Some(*to),
                value,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn post(&mut self, name: String, value: u32, image: String, lat: u32, lng: u32) {
            let locate = Locate {
                name,
                value,
                image,
                lat,
                lng,
            };
            self.locates.value.push(locate);
        }

        #[ink(message)]
        pub fn get(&self) -> Vec<Locate> {
            self.locates.value.clone()
        }
    }
}

use erc20::Maizo as ERC20;

#[derive(Default, scale::Encode, scale::Decode, Clone)]
pub struct Locates {
    value: Vec<String>,
}

#[ink(storage)]
#[derive(Default)]
pub struct Maizo {
    total_supply: Balance,
    balances: Mapping<AccountId, Balance>,
    allowances: Mapping<(AccountId, AccountId), Balance>,
    locates: Locates,
}

#[ink(event)]
pub struct Transfer {
    #[ink(topic)]
    from: Option<AccountId>,
    #[ink(topic)]
    to: Option<AccountId>,
    value: Balance,
}

#[ink(event)]
pub struct Approval {
    #[ink(topic)]
    owner: AccountId,
    #[ink(topic)]
    spender: AccountId,
    value: Balance,
}

#[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
pub enum Error {
    InsufficientBalance,
    InsufficientAllowance,
}

pub type Result<T> = core::result::Result<T, Error>;

pub struct Locate {
    name: String,
    value: u32,
    image: String,
    lat: u32,
    lng: u32,
}

#[cfg(test)]
mod tests {
    use super::*;

    use ink::primitives::{
        Clear,
        Hash,
    };

    type Event = <Maizo as ::ink::reflect::ContractEventBase>::Type;

    fn assert_transfer_event(
        event: &ink::env::test::EmittedEvent,
        expected_from: Option<AccountId>,
        expected_to: Option<AccountId>,
        expected_value: Balance,
    ) {
        let decoded_event = <Event as scale::Decode>::decode(&mut &event.data[..])
            .expect("encountered invalid contract event data buffer");
        if let Event::Transfer(Transfer { from, to, value }) = decoded_event {
            assert_eq!(from, expected_from, "encountered invalid Transfer.from");
            assert_eq!(to, expected_to, "encountered invalid Transfer.to");
            assert_eq!(value, expected_value, "encountered invalid Trasfer.value");
        } else {
            panic!("encountered unexpected event kind: expected a Transfer event")
        }
        let expected_topics = vec![
            encoded_into_hash(&PrefixedValue {
                value: b"Maizo::Transfer",
                prefix: b"",
            }),
            encoded_into_hash(&PrefixedValue {
                prefix: b"Maizo::Transfer::from",
                value: &expected_from,
            }),
            encoded_into_hash(&PrefixedValue {
                prefix: b"Maizo::Transfer::to",
                value: &expected_to,
            }),
            encoded_into_hash(&PrefixedValue {
                prefix: b"Maizo::Transfer::value",
                value: &expected_value,
            }),
        ];

        let topics = event.topics.clone();
        for (n, (actual_topic, expected_topic)) in
            topics.iter().zip(expected_topics).enumerate()
        {
            let mut topic_hash = Hash::CLEAR_HASH;
            let len = actual_topic.len();
            topic_hash.as_mut()[0..len].copy_from_slice(&actual_topic[0..len]);

            assert_eq!(
                topic_hash, expected_topic,
                "encountered invalid topic at {n}"
            );
        }
    }

    #[ink::test]
    fn new_works() {
        let _erc20 = Maizo::new(100);
        let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        assert_eq!(1, emitted_events.len());

        assert_transfer_event(
            &emitted_events[0],
            None,
            Some(AccountId::from([0x01; 32])),
            100,
        );
    }

    #[ink::test]
    fn total_supply_works() {
        let erc20 = Maizo::new(100);
        let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        assert_transfer_event(
            &emitted_events[0],
            None,
            Some(AccountId::from([0x01; 32])),
            100,
        );
        assert_eq!(erc20.total_supply(), 100);
    }

    #[ink::test]
    fn balance_of_works() {
        let erc20 = Maizo::new(100);
        let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        assert_transfer_event(
            &emitted_events[0],
            None,
            Some(AccountId::from([0x01; 32])),
            100,
        );
        let accounts =
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
        assert_eq!(erc20.balance_of(accounts.alice), 100);
        assert_eq!(erc20.balance_of(accounts.bob), 0);
    }

    #[ink::test]
    fn transfer_works() {
        let mut erc20 = Maizo::new(100);
        let accounts =
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

        assert_eq!(erc20.balance_of(accounts.bob), 0);
        assert_eq!(erc20.transfer(accounts.bob, 10), Ok(()));
        assert_eq!(erc20.balance_of(accounts.bob), 10);

        let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        assert_eq!(emitted_events.len(), 2);
        assert_transfer_event(
            &emitted_events[0],
            None,
            Some(AccountId::from([0x01; 32])),
            100,
        );
        assert_transfer_event(
            &emitted_events[1],
            Some(AccountId::from([0x01; 32])),
            Some(AccountId::from([0x02; 32])),
            10,
        );
    }

    #[ink::test]
    fn invalid_transfer_should_fail() {
        let mut erc20 = Maizo::new(100);
        let accounts =
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

        assert_eq!(erc20.balance_of(accounts.bob), 0);

        let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
        ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
        ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);

        assert_eq!(
            erc20.transfer(accounts.eve, 10),
            Err(Error::InsufficientBalance)
        );
        assert_eq!(erc20.balance_of(accounts.alice), 100);
        assert_eq!(erc20.balance_of(accounts.bob), 0);
        assert_eq!(erc20.balance_of(accounts.eve), 0);

        let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        assert_eq!(emitted_events.len(), 1);
        assert_transfer_event(
            &emitted_events[0],
            None,
            Some(AccountId::from([0x01; 32])),
            100,
        );
    }

    #[ink::test]
    fn transfer_from_works() {
        let mut erc20 = Maizo::new(100);
        let accounts =
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();
        assert_eq!(
            erc20.transfer_from(accounts.alice, accounts.eve, 10),
            Err(Error::InsufficientAllowance)
        );
        assert_eq!(erc20.approve(accounts.bob, 10), Ok(()));
        assert_eq!(ink::env::test::recorded_events().count(), 2);

        let contract = ink::env::account_id::<ink::env::DefaultEnvironment>();
        ink::env::test::set_callee::<ink::env::DefaultEnvironment>(contract);
        ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);
        assert_eq!(
            erc20.transfer_from(accounts.alice, accounts.eve, 10),
            Ok(())
        );
        assert_eq!(erc20.balance_of(accounts.eve), 10);

        let emitted_events = ink::env::test::recorded_events().collect::<Vec<_>>();
        assert_eq!(emitted_events.len(), 3);
        assert_transfer_event(
            &emitted_events[0],
            None,
            Some(AccountId::from([0x01; 32])),
            100,
        );
        assert_transfer_event(
            &emitted_events[2],
            Some(AccountId::from([0x01; 32])),
            Some(AccountId::from([0x05; 32])),
            10,
        );
    }

    #[ink::test]
    fn allowance_must_not_change_on_failed_transfer() {
        let mut erc20 = Maizo::new(100);
        let accounts =
            ink::env::test::default_accounts::<ink::env::DefaultEnvironment>();

        let alice_balance = erc20.balance_of(accounts.alice);
        let initial_allowance = alice_balance + 2;
        assert_eq!(erc20.approve(accounts.bob, initial_allowance), Ok(()));
        let callee = ink::env::account_id::<ink::env::DefaultEnvironment>();
        ink::env::test::set_callee::<ink::env::DefaultEnvironment>(callee);
        ink::env::test::set_caller::<ink::env::DefaultEnvironment>(accounts.bob);
        let emitted_events_before = ink::env::test::recorded_events().count();
        assert_eq!(
            erc20.transfer_from(accounts.alice, accounts.eve, alice_balance + 1),
            Err(Error::InsufficientBalance)
        );
        assert_eq!(
            erc20.allowance(accounts.alice, accounts.bob),
            initial_allowance
        );
        assert_eq!(
            emitted_events_before,
            ink::env::test::recorded_events().count()
        )
    }

    struct PrefixedValue<'a, 'b, T> {
        pub prefix: &'a [u8],
        pub value: &'b T,
    }

    impl<X> scale::Encode for PrefixedValue<'_, '_, X>
    where
        X: scale::Encode,
    {
        #[inline]
        fn size_hint(&self) -> usize {
            self.prefix.size_hint() + self.value.size_hint()
        }

        #[inline]
        fn encode_to<T: scale::Output + ?Sized>(&self, dest: &mut T) {
            self.prefix.encode_to(dest);
            self.value.encode_to(dest);
        }
    }

    fn encoded_into_hash<T>(entity: &T) -> Hash
    where
        T: scale::Encode,
    {
        use ink::{
            env::hash::{
                Blake2x256,
                CryptoHash,
                HashOutput,
            },
            primitives::Clear,
        };

        let mut result = Hash::CLEAR_HASH;
        let len_result = result.as_ref().len();
        let encoded = entity.encode();
        let len_encoded = encoded.len();
        if len_encoded <= len_result {
            result.as_mut()[..len_encoded].copy_from_slice(&encoded);
            return result
        }
        let mut hash_output =
            <<Blake2x256 as HashOutput>::Type as Default>::default();
        <Blake2x256 as CryptoHash>::hash(&encoded, &mut hash_output);
        let copy_len = core::cmp::min(hash_output.len(), len_result);
        result.as_mut()[0..copy_len].copy_from_slice(&hash_output[0..copy_len]);
        result
    }
}

#[cfg(all(test, feature = "e2e-tests"))]
mod e2e_tests {
    use super::*;
    use ink_e2e::build_message;
    type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

    #[ink_e2e::test]
    async fn e2e_transfer(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        let total_supply = 1_000_000_000;
        let constructor = MaizoRef::new(total_supply);
        let contract_acc_id = client
            .instantiate("erc20", &ink_e2e::alice(), constructor, 0, None)
            .await
            .expect("instantiate failed")
            .account_id;
        let total_supply_msg = build_message::<MaizoRef>(contract_acc_id.clone())
            .call(|erc20| erc20.total_supply());
        let total_supply_res = client
            .call_dry_run(&ink_e2e::bob(), &total_supply_msg, 0, None)
            .await;

        let bob_account = ink_e2e::account_id(ink_e2e::AccountKeyring::Bob);
        let transfer_to_bob = 500_000_000u128;
        let transfer = build_message::<MaizoRef>(contract_acc_id.clone())
            .call(|erc20| erc20.transfer(bob_account.clone(), transfer_to_bob));
        let _transfer_res = client
            .call(&ink_e2e::alice(), transfer, 0, None)
            .await
            .expect("transfer failed");

        let balance_of = build_message::<MaizoRef>(contract_acc_id.clone())
            .call(|erc20| erc20.balance_of(bob_account));
        let balance_of_res = client
            .call_dry_run(&ink_e2e::alice(), &balance_of, 0, None)
            .await;
        assert_eq!(
            total_supply,
            total_supply_res.return_value(),
            "total_supply"
        );
        assert_eq!(transfer_to_bob, balance_of_res.return_value(), "balance_of");

        Ok(())
    }

    #[ink_e2e::test]
    async fn e2e_allowances(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
        let total_supply = 1_000_000_000;
        let constructor = MaizoRef::new(total_supply);
        let contract_acc_id = client
            .instantiate("erc20", &ink_e2e::bob(), constructor, 0, None)
            .await
            .expect("instantiate failed")
            .account_id;
        let bob_account = ink_e2e::account_id(ink_e2e::AccountKeyring::Bob);
        let charlie_account = ink_e2e::account_id(ink_e2e::AccountKeyring::Charlie);

        let amount = 500_000_000u128;
        let transfer_from =
            build_message::<MaizoRef>(contract_acc_id.clone()).call(|erc20| {
                erc20.transfer_from(
                    bob_account.clone(),
                    charlie_account.clone(),
                    amount,
                )
            });
        let transfer_from_result = client
            .call(&ink_e2e::charlie(), transfer_from, 0, None)
            .await;

        assert!(
            transfer_from_result.is_err(),
            "unapproved transfer_from should fail"
        );

        let approved_value = 1_000u128;
        let approve_call = build_message::<MaizoRef>(contract_acc_id.clone())
            .call(|erc20| erc20.approve(charlie_account.clone(), approved_value));
        client
            .call(&ink_e2e::bob(), approve_call, 0, None)
            .await
            .expect("approve failed");

        let transfer_from =
            build_message::<MaizoRef>(contract_acc_id.clone()).call(|erc20| {
                erc20.transfer_from(
                    bob_account.clone(),
                    charlie_account.clone(),
                    approved_value,
                )
            });
        let transfer_from_result = client
            .call(&ink_e2e::charlie(), transfer_from, 0, None)
            .await;
        assert!(
            transfer_from_result.is_ok(),
            "approved transfer_from should succeed"
        );

        let balance_of = build_message::<MaizoRef>(contract_acc_id.clone())
            .call(|erc20| erc20.balance_of(bob_account));
        let balance_of_res = client
            .call_dry_run(&ink_e2e::alice(), &balance_of, 0, None)
            .await;

        let transfer_from =
            build_message::<MaizoRef>(contract_acc_id.clone()).call(|erc20| {
                erc20.transfer_from(bob_account.clone(), charlie_account.clone(), 1)
            });
        let transfer_from_result = client
            .call(&ink_e2e::charlie(), transfer_from, 0, None)
            .await;
        assert!(
            transfer_from_result.is_err(),
            "transfer_from exceeding the approved amount should fail"
        );

        assert_eq!(
            total_supply - approved_value,
            balance_of_res.return_value(),
            "balance_of"
        );

        Ok(())
    }
}
}