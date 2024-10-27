use std::thread;
use std::time::Duration;

wit_bindgen::generate!({
    // the name of the world in the `*.wit` input file
    world: "timer",
});

struct Timer;

impl Guest for Timer {
    fn calc(op: Operation) -> u32 {
        log(&format!("Starting calculation: {:?}", op));
        let result = match op {
            Operation::Add(operands) => operands.left + operands.right,
            Operation::Sub(operands) => operands.left - operands.right,
            Operation::Mul(operands) => operands.left * operands.right,
            Operation::Div(operands) => operands.left / operands.right,
        };
        log(&format!("Finished calculation: {:?}", op));
        result
    }

    fn start(seconds: u32) {
        log(&format!("Waiting for {} seconds...", seconds));
        log(&format!("Finished waiting for {} seconds.", seconds));
    }
}

// Export the Timer to the extension code.
export!(Timer);
