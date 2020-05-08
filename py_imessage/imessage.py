from py_imessage import db_conn
import os
import subprocess
from time import sleep
from shlex import quote


def send(phone, message):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    relative_path = 'osascript/send_message.js'
    path = f'{dir_path}/{relative_path}'
    cmd = f'osascript -l JavaScript {path} {quote(phone)} {quote(message)}'
    subprocess.call(cmd, shell=True)

    # Get chat message db that was sent (look at most recently sent to a phone number)
    db_conn.open()
    
    # Option 1: Loop until result is valid (hard to determine validity without adding other info to the DB)
    # Option 2: Sleep for 1 sec to allow local db to update :((
    sleep(1)
    guid = db_conn.get_most_recently_sent_text()
    return guid


def status(guid):
    db_conn.open()
    message = db_conn.get_message(guid)
    return message


def check_compatibility(phone):
    is_imessage = False
    
    dir_path = os.path.dirname(os.path.realpath(__file__))
    relative_path = 'osascript/check_imessage.js'
    path = f'{dir_path}/{relative_path}'
    cmd = f'osascript -l JavaScript {path} {phone}'
    # Gets all the output from the imessage
    output = subprocess.check_output(cmd, shell=True)

    if 'true' in output.decode('utf-8'):
        is_imessage = True

    return is_imessage
