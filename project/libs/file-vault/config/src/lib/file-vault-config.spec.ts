import { fileVaultConfig } from './file-vault-config';

describe('fileVaultConfig', () => {
  it('should work', () => {
    expect(fileVaultConfig()).toEqual('file-vault-config');
  });
});
