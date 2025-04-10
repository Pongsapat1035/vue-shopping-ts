declare const Omise: {
    setPublicKey: (config: { publicKey: string }) => void;
    createSource: (type: string, data: any, callback: (statusCode: number, response: any) => void) => void;
    // Add other methods and properties of the Omise object as needed
  };