from django import template

register = template.Library()

@register.filter(name='cutty')
def cutty(value, arg):
    return value.replace(arg, '')
