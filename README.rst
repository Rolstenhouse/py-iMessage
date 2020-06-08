===========
py-imessage
===========
|License| |Downloads|

py-imessage is a library to send iMessages from your computer. It was originally used to build an API for iMessages; however, Apple doesn't support third-parties using iMessage over a few hundred marketing messages per day. 

------------
Installation
------------

Run the following commands on the terminal

.. code:: bash

    pip install py-imessage

    # Disable system integrity protection in order to allow access to chat.db
    csrutil disable 
    
If running :code:`csrutil disable` doesn't work. Try `this stackoverflow post <https://apple.stackexchange.com/questions/208478/how-do-i-disable-system-integrity-protection-sip-aka-rootless-on-macos-os-x>`_

------------
Sample Usage
------------

.. code:: python

    from py_imessage import imessage
    import sleep
    
    phone = "1234567890"

    if not imessage.check_compatibility(phone):
        print("Not an iPhone")
    
    guid = imessage.send(phone, "Hello World!")
    
    # Let the recipient read the message
    sleep(5)
    resp = imessage.status(guid)

    print(f'Message was read at {resp.get("date_read")}')

-------------
Documentation
-------------

Sending a message
-----------------
Send a message to a new or an existing contact! 

**.send(phone, message)** 
~~~~~~~~~~~~~~~~~~~~~~~~~

*Args*

**Phone** | ten-digit phone number of string type format XXXXXXXXXXX i.e. "1234567890"

*Response*

**Message** | The message you plan to send. i.e. "Hi!"

.. list-table:: Returns a **string**, the GUID 
    :header-rows: 1

    * - Type
      - Description
    * - string
      - GUID unique to the message (used for checking on status)

Message status
--------------

Check whether a message you sent has been delivered and read (if read receipts turned on). 

**.status(guid)**
~~~~~~~~~~~~~~~~~

*Args*

**Guid** | guid returned from sending a message

*Response*

.. list-table:: Returns a **dict**, with following fields
    :header-rows: 1

    * - Field 
      - Type
      - Description
      - Sample
    * - **guid**
      - string
      - guid that was passed in to the function
      - "3A146100-D269-4F35-BDB4-EB2FF7DBDF0F"
    * - **date_submitted**
      - datetime
      - date message was submitted
      - "Sun, 12 Apr 2020 05:46:48 GMT"
    * - **date_delivered**
      - datetime
      - date message was delivered to recipient's phone
      - "Sun, 12 Apr 2020 05:46:49 GMT"
    * - **date_read**
      - datetime
      - date message was read on recipient's phone
      - "Sun, 12 Apr 2020 05:47:38 GMT"


Checking iMessage compatibility
-------------------------------

Check whether a phone number is registered to an iPhone or an Android device. NOTE: This method is exceptionally slow, so you should cache the response. 

**.check_compatibility(phone)**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Args*

**Phone** | ten-digit phone number of string type format XXXXXXXXXXX i.e. "1234567890"

*Response*

.. list-table:: Returns a **boolean**, compatibility 
    :header-rows: 1

    * - Type
      - Description
    * - boolean
      - Whether number supports receiving iMessages


Contributing
------------
Please create an issue. Or feel free to add a PR!

.. |License| image:: http://img.shields.io/:license-mit-blue.svg
   :target: https://pypi.python.org/pypi/Flask-Cors/
   
.. |Downloads| image:: https://pepy.tech/badge/py-imessage
   :target: https://pepy.tech/project/py-imessage
