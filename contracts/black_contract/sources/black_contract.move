/*
/// Module: black_contract
module black_contract::black_contract;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions

module black_contract::black_contract;

use sui::clock::{Self, Clock};
use sui::event;

public struct StatusPost has key, store {
    id: UID,
    owner: address,
    content: vector<u8>,
    timestamp: u64,
}

public struct StatusPostEvent has copy, drop, store {
    owner: address,
    content: vector<u8>,
    timestamp: u64,
}

public entry fun post_status(content: vector<u8>, clock: &Clock, ctx: &mut TxContext) {
    let timestamp = clock::timestamp_ms(clock);
    let owner = tx_context::sender(ctx);

    let post = StatusPost {
        id: object::new(ctx),
        owner,
        content,
        timestamp,
    };

    event::emit(StatusPostEvent {
        owner,
        content,
        timestamp,
    });

    transfer::transfer(post, owner);
}
