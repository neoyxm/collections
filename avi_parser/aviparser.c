#include <stdio.h>
#include <stdlib.h>
#include <memory.h>
 
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
 
    parse_riff(fp);
    fclose(fp);
 
    return 0;
}
