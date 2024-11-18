declare module 'llamaai' {
  export class LlamaAI {
    constructor(config: { apiKey: string });

    run(request: object): Promise<any>;
  }
}
