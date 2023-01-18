import png

black_cell = 255
while_cell = 0
barcode_height = 70
thickness = 2
padding_y = 5
padding_x = 5


def render_barcode(code_sign_array, filename="barcode"):
    result_barcode = prettify_barcode(normalize_barcode(code_sign_array))
    return png.from_array(result_barcode, 'L').save(filename + ".png")


def normalize_barcode(code_sign_array):
    result_barcode = []
    result_barcode.extend([black_cell] * padding_x)

    for idx, value in enumerate(code_sign_array):
        if idx % 2 == 1:
            result_barcode.extend([black_cell] * value * thickness)
        else:
            result_barcode.extend([while_cell] * value * thickness)

    result_barcode.extend([black_cell] * padding_x)
    return result_barcode


def prettify_barcode(barcode):
    _len = len(barcode)
    white_line = [black_cell] * _len
    result_barcode = []
    result_barcode.extend(padding_y * [white_line])
    result_barcode.extend(barcode_height * [barcode])
    result_barcode.extend(padding_y * [white_line])
    return result_barcode
