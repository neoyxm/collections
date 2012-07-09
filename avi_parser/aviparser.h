#ifndef __AVI_PARSER_H__
#define __AVI_PARSER_H__

#define mmioFOURCC(ch0, ch1, ch2, ch3)\
    ((unsigned int)(unsigned char)(ch0) | ((unsigned int)(unsigned char)(ch1) << 8) |\
    ((unsigned int)(unsigned char)(ch2) << 16) | ((unsigned int)(unsigned char)(ch3) << 24 ))

#define mmioSIZE(ch0, ch1, ch2, ch3)\
    ((int)(unsigned char)(ch0) | ((int)(unsigned char)(ch1) << 8) |\
    ((int)(unsigned char)(ch2) << 16) | ((int)(unsigned char)(ch3) << 24 ))

#define FOURCC_RIFF mmioFOURCC('R','I','F','F')
#define FOURCC_LIST mmioFOURCC('L','I','S','T')
#define FOURCC_AVI  mmioFOURCC('A','V','I',' ')
#define FOURCC_hdrl  mmioFOURCC('h','d','r','l')
#define FOURCC_avih  mmioFOURCC('a','v','i','h')
#define FOURCC_strl  mmioFOURCC('s','t','r','l')
#define FOURCC_strh  mmioFOURCC('s','t','r','h')
#define FOURCC_strf  mmioFOURCC('s','t','r','f')
#define FOURCC_strd  mmioFOURCC('s','t','r','d')
#define FOURCC_divx  mmioFOURCC('d','i','v','x')
#define FOURCC_DIVX  mmioFOURCC('D','I','V','X')
#define FOURCC_vids  mmioFOURCC('v','i','d','s')

#define MAX_RIFF_BUFF (64*1024)

typedef struct avitag avitag_t;
typedef struct videoinfo videoinfo_t;
struct avitag
{
    unsigned int fcc;
    int size;
    unsigned int flag;
    int nested;
    int has_sub;
}; 

struct videoinfo
{
	unsigned int tag_fcc;
	unsigned int codec_fcc;
	int has_strd;
};

#endif //__AVI_PARSER_H__ 