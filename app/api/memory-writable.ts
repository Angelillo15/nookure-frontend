import { Writable, type WritableOptions } from 'stream';

class MemoryWritable extends Writable {
  private memory: string;

  constructor(options?: WritableOptions) {
    super(options);
    this.memory = '';
  }

  _write(chunk: any, encoding: string, callback: Function): void {
    this.memory += chunk.toString();
    callback();
  }

  getMemory(): string {
    return this.memory;
  }
}

export default MemoryWritable;