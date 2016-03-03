#! python2

import io
import json
import os
import re
from collections import OrderedDict


# -----------------------------------------------------------------------------

def message_file(locale="en"):
    return os.path.join("_locales", locale, "messages.json")


with io.open(message_file("en"), "r", encoding="utf-8") as f:
    english_placeholders = [ (k, v["placeholders"]) for k, v in json.load(f).items() if "placeholders" in v ]


for locale_name in os.listdir("_locales"):
    if locale_name == "en":
        continue

    with io.open(message_file(locale_name), "r+", encoding="utf-8") as f:
        messages = json.load(f, object_pairs_hook=OrderedDict)
        changed = 0

        for key, placeholder in english_placeholders:
            if key in messages and cmp(placeholder, messages[key].get('placeholders', None)) != 0:
                messages[key]["placeholders"] = placeholder
                changed += 1

        if changed > 0:
            json_str = json.dumps(messages, ensure_ascii=False, encoding="utf-8", sort_keys=True, indent="\t", separators=(",", ": "))
            # json_tabs = re.sub(r'^\s+', lambda s: s.group(0).replace(' ', '\t'), json_str, flags=re.MULTILINE)

            f.seek(0)
            f.write(json_str + "\n")
            f.truncate()

            print "Placeholders added to %s: %d" % (locale_name, changed)
