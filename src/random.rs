#[no_mangle]
pub fn generate_wasm_random(seed: u32) -> i32 {
    // Use provided seed instead of system time
    let mut state = seed;
    
    // Multiple rounds of bit mixing
    state ^= state << 13;
    state ^= state >> 7;
    state ^= state << 17;
    
    // Add more entropy
    state = state.wrapping_mul(0x45d9f3b);
    
    // Final mixing
    state ^= state >> 16;
    state ^= state << 5;
    state ^= state >> 7;

    // Convert to range 0-999
    (state % 1000) as i32
}