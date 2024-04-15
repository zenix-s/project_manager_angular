#include <stdio.h>
#include <stdlib.h>
int hello(char **text)
{
  *text = malloc(5*sizeof(char));
  *text = "hola";
  return 1;
}


int main(void)
{
  char *text;

  hello(&text);

  printf("%s", text);
  
  return 0;
}
