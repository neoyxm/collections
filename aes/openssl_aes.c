/**
  AES encryption/decryption demo program using OpenSSL EVP apis

  this is public domain code.

  Neo Yang (ynicle@gmail.com)
**/

#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sys/types.h>
#include <unistd.h>
#include <openssl/evp.h>

#include "utils.h"

#define AES_BLOCK_SIZE (128)
#define AES128_KEY_LEN (16)
#define AES128_IV_LEN  (16)

/**
 * Create an 128 bit key and IV using the supplied key_data. salt can be added for taste.
 * Fills in the encryption and decryption ctx objects and returns 0 on success
 **/
int aes_init(unsigned char *key, unsigned char *iv, EVP_CIPHER_CTX *e_ctx,
             EVP_CIPHER_CTX *d_ctx)
{
    if (!key || !iv) return -1;

    EVP_CIPHER_CTX_init(e_ctx);
    EVP_EncryptInit_ex(e_ctx, EVP_aes_128_cbc(), NULL, key, iv);
    EVP_CIPHER_CTX_init(d_ctx);
    EVP_DecryptInit_ex(d_ctx, EVP_aes_128_cbc(), NULL, key, iv);

    /* allows reusing of 'e' for multiple encryption cycles */
    if(!EVP_EncryptInit_ex(e_ctx, NULL, NULL, NULL, NULL)) {
        printf("ERROR in EVP_EncryptInit_ex \n");
        return -1;
    }

    return 0;
}

/*
 * Encrypt *len bytes of data
 * All data going in & out is considered binary (unsigned char[])
 */
unsigned char *aes_encrypt(EVP_CIPHER_CTX *e, unsigned char *plaintext, int *len)
{
    /* max ciphertext len for a n bytes of plaintext is n + AES_BLOCK_SIZE -1 bytes */
    int c_len = *len + AES_BLOCK_SIZE - 1;
    unsigned char *ciphertext = (unsigned char *)malloc(c_len);

    /* update ciphertext, c_len is filled with the length of ciphertext generated,
      *len is the size of plaintext in bytes */
    if(!EVP_EncryptUpdate(e, ciphertext, &c_len, plaintext, *len)) {
        printf("ERROR in EVP_EncryptUpdate \n");
        return NULL;
    }

    *len = c_len;
    return ciphertext;
}

/*
 * Decrypt *len bytes of ciphertext
 */
unsigned char *aes_decrypt(EVP_CIPHER_CTX *e, unsigned char *ciphertext, int *len)
{
    /* plaintext will always be equal to or lesser than length of ciphertext*/
    int p_len = *len;
    unsigned char *plaintext = (unsigned char *)malloc(p_len);

    if(!EVP_DecryptInit_ex(e, NULL, NULL, NULL, NULL)) {
        printf("ERROR in EVP_DecryptInit_ex \n");
        return NULL;
    }

    if(!EVP_DecryptUpdate(e, plaintext, &p_len, ciphertext, *len)) {
        printf("ERROR in EVP_DecryptUpdate\n");
        return NULL;
    }

    *len = p_len;
    return plaintext;
}

void print_usage()
{
    printf("usage: aes dec/enc KEY IV in_file out_file\n");
    exit(1);
}

int main(int argc, char **argv)
{
    int bDec = 0, bEnc = 0;
    /* "opaque" encryption, decryption ctx structures that libcrypto uses to record
       status of enc/dec operations */
    EVP_CIPHER_CTX en, de;

    unsigned char aes_key[AES128_KEY_LEN];
    unsigned char aes_iv[AES128_IV_LEN];
    char file_in[512];
    char file_out[512];

    if (argc < 6) {
        print_usage();
    }

    if (!strncmp(argv[1], "enc", 3))
        bEnc = 1;
    else if (!strncmp(argv[1], "dec", 3))
        bDec = 1;
    else {
        printf("error: Should select decrypt or encrypt\n");
        print_usage();
    }

    if (strlen(argv[2]) != AES128_KEY_LEN * 2) {
        printf("error: Key hex string should be 32 bytes\n");
        print_usage();
    } else {
        set_hex(argv[2], aes_key, sizeof(aes_key));
        dump_hex(aes_key, sizeof(aes_key));
    }


    if (strlen(argv[3]) != AES128_IV_LEN * 2) {
        printf("error: IV hex string should be 32 bytes\n");
        print_usage();
    } else {
        set_hex(argv[3], aes_iv, sizeof(aes_iv));
        dump_hex(aes_iv, sizeof(aes_iv));
    }

    if (strlen(argv[4])) {
        strncpy(file_in, argv[4], sizeof(file_in));
    }

    if (strlen(argv[5])) {
        strncpy(file_out, argv[5], sizeof(file_out));
    }

    printf("in file:%s\n", file_in);
    printf("out file:%s\n", file_out);


    /* gen key and iv. init the cipher ctx object */
    if (aes_init(aes_key, aes_iv, &en, &de)) {
        printf("Couldn't initialize AES cipher\n");
        return -1;
    }

    int fd_in = -1, fd_out = -1;
    int readCnt = 0;
    unsigned char buff[1024] = {0};

    fd_in = open(file_in, O_RDONLY);
    if (fd_in < 0) {
        printf("Open failed %s\n", file_in);
        goto out;
    }

    fd_out = open(file_out, O_WRONLY|O_CREAT|O_TRUNC, 0644);
    if (fd_out < 0) {
        printf("Open failed %s\n", file_out);
        goto out;
    }

    while((readCnt=read(fd_in, buff, sizeof(buff))) > 0) {
        unsigned char *ciphertext = NULL;
        int len = readCnt;

        if (bEnc) {
            ciphertext = aes_encrypt(&en, buff, &len);
        } else if (bDec) {
            ciphertext = aes_decrypt(&de, buff, &len);
        }

        if (len > 0 && ciphertext)
            write(fd_out, ciphertext, len);

        if (ciphertext) free(ciphertext);
    }

    /* update ciphertext with the final remaining bytes */
    unsigned char final_buff[AES_BLOCK_SIZE/8 + 1] = {0};
    int f_len = 0;
    if (bEnc) {
        if(!EVP_EncryptFinal_ex(&en, final_buff, &f_len)) {
            printf("ERROR in EVP_EncryptFinal_ex \n");
            goto out;//return -1;
        }
    } else if (bDec) {
        if(!EVP_DecryptFinal_ex(&de, final_buff, &f_len)) {
            printf("ERROR in EVP_DecryptFinal_ex \n");
            goto out;//return -1;
        }
        printf("f_len:%d\n", f_len);
    }

    if (f_len > 0) {
        write(fd_out, final_buff, f_len);

    }

out:
    if(fd_in >= 0) close(fd_in);
    if(fd_out >= 0) close(fd_out);
    EVP_CIPHER_CTX_cleanup(&de);
    EVP_CIPHER_CTX_cleanup(&en);

    return 0;
}

