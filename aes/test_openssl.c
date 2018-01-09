
auto key = from_hex_string("2B7E151628AED2A6ABF7158809CF4F3C");
auto i_vec = from_hex_string("000102030405060708090A0B0C0D0E0F");
auto plan_vec = from_hex_string("6B");

AES_KEY aes_enc_ctx;
AES_set_encrypt_key(key.data(), 128, &aes_enc_ctx);
std::vector<unsigned char> cipher_vec(16);
AES_cbc_encrypt(plan_vec.data(), cipher_vec.data(), 1, &aes_enc_ctx, i_vec.data(), AES_ENCRYPT);

std::cout << "plan   : " << to_hex_string(plan_vec) << std::endl;
std::cout << "cipher : " << to_hex_string(cipher_vec) << std::endl;
std::cout << "ivec   : " << to_hex_string(i_vec) << std::endl;

AES_KEY aes_dec_ctx;
AES_set_decrypt_key(key.data(), 128, &aes_dec_ctx);
std::vector<unsigned char> decrypt_vec(16);
i_vec = from_hex_string("000102030405060708090A0B0C0D0E0F");
AES_cbc_encrypt(cipher_vec.data(), decrypt_vec.data(), 16, &aes_dec_ctx, i_vec.data(), AES_DECRYPT);

std::cout << "decrypt: " << to_hex_string(decrypt_vec) << std::endl;
