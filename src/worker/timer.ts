self.onmessage = (e: MessageEvent<string>) => {
  if (e.data) {
    self.postMessage("");
  }
};

export {};
