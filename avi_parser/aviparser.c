#include <stdio.h>
#include <stdlib.h>
#include <memory.h>

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



typedef struct avitag avitag_t;
struct avitag
{
    unsigned int fcc;
    int size;
    unsigned int flag;
    int nested;
    int has_sub;
}; 
 

#if 0 
typedef struct avitag avitag_t;
struct avitag
{
    char fcc[4];
    int size;
    char flag[4];
    int nested;
    int has_sub;
    int (*parser)(FILE *fp, const avitag_t *tag);
}; 
 
typedef struct
{
    char fcc[4];
    int (*parser)(FILE *fp, const avitag_t *tag);
} parser_map_t;
 
int null_parser(FILE *fp, const avitag_t* tag); 

int parse_strh(FILE *fp, const avitag_t *tag);
int parse_strl(FILE *fp, const avitag_t *tag);
parser_map_t parser_list[] = 
{
    {{'J', 'U', 'N', 'K'}, null_parser}, 
    {{'s', 't', 'r', 'h'}, parse_strh}, 
    {{'s', 't', 'r', 'l'}, parse_strh}, 
};
 
int null_parser(FILE *fp, const avitag_t* tag)
{
    int size = tag->size + (tag->size&1);
 
    fseek(fp, size, SEEK_CUR);
    return ftell(fp);
}
 
int find_parser(avitag_t *tag)
{
    int i;
 
    for (i = 0; i < sizeof(parser_list)/sizeof(parser_map_t); i++)
    {
        if (memcmp(parser_list[i].fcc, tag->fcc, 4) == 0)
        {
            tag->parser = parser_list[i].parser;
            return 0;			
        }		
    }
   return -1;
}
 
int parse_tag(FILE *fp, avitag_t* tag)
{
    int i;
    unsigned char buf[8];
    unsigned int *pfcc;
 
    if (fread(buf, 1, 8, fp) != 8)
        return -1;  /* end of file */
    memset(tag, 0, sizeof(avitag_t)); 
    tag->fcc[0] = buf[0];
    tag->fcc[1] = buf[1];
    tag->fcc[2] = buf[2];
    tag->fcc[3] = buf[3];
    tag->size = buf[4] | (buf[5]<<8) | (buf[6]<<16) | (buf[7]<<24);
 
    pfcc = 	(unsigned int*) &tag->fcc;
    /* 'R' 'I' 'F' 'F' or 'L' 'I' 'S' 'T'*/
    if (*pfcc == 0x46464952 || *pfcc == 0x5453494c) 
    {
        if (fread(&tag->flag, 1, 4, fp) != 4)
            return -1; /* end of file */	
		char  riff_avi[4] = {'A','V','I',' '};
		if (*pfcc == 0x46464952 && memcmp(tag->flag, riff_avi, 4) == 0)
		{
			printf("found the RIFF AVI\n");
		}
        tag->has_sub = 1;			
    }
    return ftell(fp);
}
 
void print_tag(const avitag_t *tag)
{
    int idx = tag->nested;
 
    while (idx-- >= 0)
    {
        putchar(0x20);
    }
    putchar(tag->fcc[0]);
    putchar(tag->fcc[1]);
    putchar(tag->fcc[2]);
    putchar(tag->fcc[3]);
    if (tag->has_sub)
    {
        putchar('[');
        putchar(tag->flag[0]);
        putchar(tag->flag[1]);
        putchar(tag->flag[2]);
        putchar(tag->flag[3]);
        putchar(']');	    
    }
    printf("+%dB\n", tag->size);
}
 
#define NEST_LENGTH 20 	
void parse_riff(FILE *fp)
{
    avitag_t tag;
    int end_chunk[NEST_LENGTH];
    int nested = 0;
 
    while(parse_tag(fp, &tag) >= 0)
    { 
        tag.nested = nested;
        print_tag(&tag);	

        if (tag.has_sub)  /* LIST or RIFF */
        {
			char movi_fcc[4] = {'m','o','v','i'};
			if (memcmp(tag.flag, movi_fcc, 4) == 0)
				break;

            if (nested++ > NEST_LENGTH) abort();
            end_chunk[nested] = ftell(fp) + tag.size - 4;			    
            continue;
        }

        find_parser(&tag);		
        if (!tag.parser) 
            null_parser(fp, &tag); /* no parser found, skip... */
        else		
            tag.parser(fp, &tag);  /* parse data chunck */
        if (tag.nested && ftell(fp) >= end_chunk[tag.nested])
        {
            nested--;		
        }		
    }
    return;
}

int parse_strh(FILE *fp, const avitag_t *tag)
{
    unsigned char strh[56];
    char fourcc[5];
    unsigned int value;
    unsigned long pos = ftell(fp);
    int idx= tag->nested+1;;
 
    if (sizeof(strh) != fread(&strh, 1, sizeof(strh), fp))
        return -1;
 
    while (idx-- >= 0)
    {
        putchar(0x20);
    }
 
    putchar('{');
    memcpy(fourcc, strh, 4);
    fourcc[4] = 0;
    printf("[%s], ", fourcc);
    memcpy(fourcc, strh+4, 4);
    fourcc[4] = 0;
    printf("[%s], ", fourcc);
    value = strh[16] | (strh[17]<<8) | (strh[18]<<16) | (strh[19]<<24);	
    printf("Initial %d, ", value);
    value = strh[20] | (strh[21]<<8) | (strh[22]<<16) | (strh[23]<<24);	
    printf("%d/", value);	
    value = strh[24] | (strh[25]<<8) | (strh[26]<<16) | (strh[27]<<24);	
    printf("%d, ", value);	
    value = strh[28] | (strh[29]<<8) | (strh[30]<<16) | (strh[31]<<24);	
    printf("%d+", value);
    value = strh[32] | (strh[33]<<8) | (strh[34]<<16) | (strh[35]<<24);	
    printf("%d, ", value);	
    value = strh[36] | (strh[37]<<8) | (strh[38]<<16) | (strh[39]<<24);	
    printf("Buffer:%d Bytes, ", value);
    value = strh[40] | (strh[41]<<8) | (strh[42]<<16) | (strh[43]<<24);		
    printf("quality:0x%x, ", value);
    value = strh[44] | (strh[45]<<8) | (strh[46]<<16) | (strh[47]<<24);		
    printf("Size of Sample:%d, ", value);	
    putchar('}');
    putchar('\n');
 
    fseek(fp, pos+tag->size+(tag->size&1), SEEK_SET);   
    return ftell(fp);
}

int parse_strl(FILE *fp, const avitag_t *tag)
{
	printf("found the strl\n");
	return 0;
}
#endif 
int parse_strh(FILE *fp, const avitag_t *tag)
{
    unsigned char strh[56];
    char fourcc[5];
    unsigned int value;
    unsigned long pos = ftell(fp);
    int idx= tag->nested+1;;
 
    if (sizeof(strh) != fread(&strh, 1, sizeof(strh), fp))
        return -1;
 
    while (idx-- >= 0)
    {
        putchar(0x20);
    }
 
    putchar('{');
    memcpy(fourcc, strh, 4);
    fourcc[4] = 0;
    printf("[%s], ", fourcc);
    memcpy(fourcc, strh+4, 4);
    fourcc[4] = 0;
    printf("[%s], ", fourcc);
    value = strh[16] | (strh[17]<<8) | (strh[18]<<16) | (strh[19]<<24);	
    printf("Initial %d, ", value);
    value = strh[20] | (strh[21]<<8) | (strh[22]<<16) | (strh[23]<<24);	
    printf("%d/", value);	
    value = strh[24] | (strh[25]<<8) | (strh[26]<<16) | (strh[27]<<24);	
    printf("%d, ", value);	
    value = strh[28] | (strh[29]<<8) | (strh[30]<<16) | (strh[31]<<24);	
    printf("%d+", value);
    value = strh[32] | (strh[33]<<8) | (strh[34]<<16) | (strh[35]<<24);	
    printf("%d, ", value);	
    value = strh[36] | (strh[37]<<8) | (strh[38]<<16) | (strh[39]<<24);	
    printf("Buffer:%d Bytes, ", value);
    value = strh[40] | (strh[41]<<8) | (strh[42]<<16) | (strh[43]<<24);		
    printf("quality:0x%x, ", value);
    value = strh[44] | (strh[45]<<8) | (strh[46]<<16) | (strh[47]<<24);		
    printf("Size of Sample:%d, ", value);	
    putchar('}');
    putchar('\n');
 
    fseek(fp, pos+tag->size+(tag->size&1), SEEK_SET);   
    return ftell(fp);
}

int parser_read_tag(FILE *fp, avitag_t *tag)
{
    unsigned char buf[8];
 
    if (fread(buf, 1, 8, fp) != 8)
        return -1;  /* end of file */
    memset(tag, 0, sizeof(avitag_t)); 
	
	tag->fcc = mmioFOURCC(buf[0], buf[1], buf[2], buf[3]);
    tag->size = buf[4] | (buf[5]<<8) | (buf[6]<<16) | (buf[7]<<24);

	return 0;

}

int parser_read_flag(FILE *fp, avitag_t *tag)
{
    unsigned char buf[8];
 
    if (fread(buf, 1, 4, fp) != 4)
        return -1;  /* end of file */
	tag->flag = mmioFOURCC(buf[0], buf[1], buf[2], buf[3]);
	return 0;
}


int parser_skip(FILE *fp, const avitag_t* tag)
{
    int size = tag->size + (tag->size&1);
 
    fseek(fp, size, SEEK_CUR);
    return ftell(fp);
}

#define MAX_RIFF_BUFF (64*1024)
	
int parser_probe_riff(FILE *fp, avitag_t* tag)
{
	// seeking riff in the first 64k byte data
	int offset = 0;
	int ret = -1;
	unsigned char buf[MAX_RIFF_BUFF + 12] = {0}; 
	unsigned char *p = buf;

	 if (fread(buf, 1, sizeof(buf), fp) != sizeof(buf))
        return -1;  /* end of file */

    memset(tag, 0, sizeof(avitag_t)); 

	while (p && (p-buf < MAX_RIFF_BUFF-4))
	{
		if (mmioFOURCC(p[0], p[1], p[2], p[3]) == FOURCC_RIFF)
		{
			tag->fcc = mmioFOURCC(p[0], p[1], p[2], p[3]);
			tag->size = mmioSIZE(p[4], p[5], p[6], p[7]);
			tag->flag = mmioSIZE(p[8], p[9], p[10], p[11]);
			p += 12;
			ret = 0;
			break;
		}
		p++;
	}

	offset = sizeof(buf) - (p - buf);
	if (offset > 0)
		fseek (fp, -offset, SEEK_CUR);
	//printf("cur pos: %ld, offset:%d\n", ftell(fp), offset);

	return ret;
}

int parser_lists(FILE *fp, avitag_t* tag1)
{
	avitag_t tag;
	while(parser_read_tag(fp, &tag) == 0)
	{
		if ( tag.fcc == FOURCC_LIST)
		{
			printf("Found LIST, size: %d\n", tag.size);
			if(parser_read_flag(fp, &tag) == 0)
			{
				if (tag.flag == FOURCC_hdrl)
				{
					avitag_t tag_avih;
					printf("Found the flag: hdrl,size:%d\n", tag.size);

					if (parser_read_tag(fp, &tag_avih) == 0)
					{
						if (tag_avih.fcc == FOURCC_avih)
						{
							avitag_t tag_list;
							printf("Found the flag: avih, size:%d\n", tag_avih.size);
							parser_skip(fp, &tag_avih);

							while (parser_read_tag(fp, &tag_list)==0)
							{
								if (tag_list.fcc == FOURCC_LIST)
								{
									printf("Found LIST, size: %d\n", tag_list.size);
								}
								if(parser_read_flag(fp, &tag_list) == 0)
								if (tag_list.flag == FOURCC_strl)
								{
									avitag_t tag_strl;
									long long int offset = 0;
									
									while((tag_list.size - 4) - offset > 8 && parser_read_tag(fp, &tag_strl)==0)
									{
										offset +=8;

										switch(tag_strl.fcc)
										{
											case FOURCC_strh:
												{
													printf("Found the flag:strh, size:%d\n", tag_strl.size);
													parse_strh(fp, &tag_strl);
													offset += tag_strl.size;
													//printf("1offset :%lld \n", offset);
												}
												break;
											case FOURCC_strf:
												{
													printf("Skip the flag:strf, size:%d\n", tag_strl.size);
													parser_skip(fp, &tag_strl);
													offset += tag_strl.size;
													//printf("2offset :%lld \n", offset);
												}
												break;
											case FOURCC_strd:
												{
													printf("Found the flag:strd, size:%d\n", tag_strl.size);
													parser_skip(fp, &tag_strl);
													offset += tag_strl.size;
													//printf("3offset :%lld \n", offset);
												}
												break;
											default: break;
										}
										
									}
									if ((tag_list.size - 4) - offset > 0)
										fseek(fp, (tag_list.size - 4) - offset, SEEK_CUR);
									printf("4offset :%lld \n", offset);
								}
								

							}
						}
					}
				}
				else
				{
					// if not hdrl, skip this LIST tag
					printf("not hdrl,just skip it\n\n");
					fseek(fp, tag.size-4, SEEK_CUR);
					continue;
				}
			}
		}
	}

	return 0;
}

int parser_is_divx_drm(FILE *fp)
{
	avitag_t tag;

	if (parser_probe_riff(fp, &tag) == 0)
	{
		printf("Found RIFF, size: %d\n", tag.size);

		if (tag.fcc == FOURCC_RIFF)
		{
			if (tag.flag == FOURCC_AVI)
				printf("Found RIFF AVI flag\n");
			else
			{
				printf("not avi format, exit\n");
				return -1;
			}
		} 

		if (parser_lists(fp, &tag) == 0)
		{
			printf("Parsed lists sucessfully\n");
		}
		else
		{
			printf("failed to parser lists\n");
			return -1;
		}
	}
	else 
	{
		printf("Error: not a riff file\n");
	}

	return 0;
}


int main(int argc, char**argv)
{
    FILE *fp; 
 
    if (argc <= 1)
    {
        printf("Usage: %s filename", argv[0]);
        return 0;
    }
 
    fp = fopen(argv[1], "rb");
    if (fp == NULL)
    {
        printf("Error in opening file %s", argv[1]);
        return -1;
    }
 
    parser_is_divx_drm(fp);
    fclose(fp);
 
 
#ifdef __WIN32__
{
    char c = 0;
	getchar();
}
#endif
 
    return 0;
}
