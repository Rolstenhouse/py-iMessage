# -*- coding: utf-8 -*-
"""
    setup
    ~~~~
    py-iMessage is an extension to let you send/receive iMessages
    :copyright: (c) 2020 by Rob Olsthoorn.
    :license: MIT, see LICENSE for more details.
"""

from setuptools import setup
from os.path import join, dirname

with open (join(dirname(__file__), 'requirements.txt'), 'r') as f:
    install_requires = f.read().split("\n")

setup(
    name='py-iMessage',
    version=1.6,
    url='https://github.com/rolstenhouse/py-imessage',
    license='MIT',
    author='Rob Olsthoorn',
    author_email='rolsthoorn12@gmail.com',
    description="Support for sending/receiving iMessages",
    long_description=open('README.rst').read(),
    packages=['py_imessage'],
    zip_safe=False,
    include_package_data=True,
    platforms='any',
    install_requires=install_requires,
    tests_require=[
        'nose'
    ],
    test_suite='nose.collector',
    classifiers=[
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: Implementation :: CPython',
        'Programming Language :: Python :: Implementation :: PyPy',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ]
)