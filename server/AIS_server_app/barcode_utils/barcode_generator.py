from .code128_chart import *


def str_to_barcode(string):
    text = str(string)
    index = 0
    length = len(text)

    if length > 1 and text[:2].isdigit():
        charset = CODE128_C
        codes = [charset['StartC']]
    else:
        charset = CODE128_B
        codes = [charset['StartB']]

    while index < length:
        if charset is CODE128_C:
            if index + 2 <= length and text[index:index + 2].isdigit():
                codes.append(int(text[index:index + 2]))
                index += 2
            else:
                codes.append(charset['CodeB'])
                charset = CODE128_B
        elif index + 4 <= length and text[index:index + 4].isdigit():
            codes.append(charset['CodeC'])
            charset = CODE128_C
        else:
            if text[index] == ' ':
                codes.append(charset['space'])
            else:
                codes.append(charset[text[index]])
            index += 1

    codes.append(calc_check_sum(codes) % 103)

    codes.append(charset['Stop'])

    barcode_widths = []
    for code in codes:
        for weight in WEIGHTS[code]:
            barcode_widths.append(int(weight))
    return barcode_widths


def calc_check_sum(codes):
    checksum = 0
    for weight, code in enumerate(codes):
        checksum += max(weight, 1) * code
    return checksum
