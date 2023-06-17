import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:requests/requests.dart';
import 'dart:developer';
import 'dart:convert';
import 'package:intl/intl.dart';
import 'package:intl/date_symbol_data_local.dart';


void main() {
  initializeDateFormatting().then((_) {
    runApp(const MyApp());
  });
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MMA Events mobile app',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'MMA Events'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  List<dynamic> upcomingEvents = [];
  List<dynamic> pastEvents = [];

  @override
  void initState() {
    super.initState();
    fetchData();
  }

  Future<void> fetchData() async {
    final response = await Requests.get('http://10.0.2.2:8008/events');
    if (response.statusCode == 200) {
      final events = jsonDecode(response.body);
      final currentDate = DateTime.now().millisecondsSinceEpoch;
      log('events $events');

      setState(() {
        for (final event in events) {
          final eventDate = DateTime.fromMillisecondsSinceEpoch(event['date']);

          if (eventDate.isAfter(DateTime.now())) {
            upcomingEvents.add(event);
          } else {
            pastEvents.add(event);
          }
        }
        pastEvents.sort((a, b) => b['date'].compareTo(a['date']));
      });
    } else {
      throw Exception('Failed to fetch data from API');
    }
  }

  @override
  Widget build(BuildContext context) {
    final dateTimeFormat = DateFormat('MM/dd/yyyy \'at\' HH:mm');
    return Scaffold(
      appBar: AppBar(
        title: const Text('MMA Events'),
      ),
      body: ListView.builder(
        itemCount: upcomingEvents.length + pastEvents.length + 1,
        itemBuilder: (BuildContext context, int index) {
          if (index == 0) {
            return const ListTile(
              title: Text(
                'Upcoming events',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            );
          } else if (index == upcomingEvents.length + 1) {
            return const ListTile(
              title: Text(
                'Past events',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            );
          }
          if (index <= upcomingEvents.length) {
            final event = upcomingEvents[index - 1];
            final eventName = event['name'];
            final eventDate =
            DateTime.fromMillisecondsSinceEpoch(event['date']);
            final eventLocation = event['location'];
            final formattedDate = dateTimeFormat.format(eventDate);

            return Container(
              margin: const EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8.0),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: ListTile(
                title: Text(eventName),
                subtitle: Text(eventLocation),
                trailing: Text(formattedDate),
              ),
            );
          } else {
            final pastEvent = pastEvents[index - upcomingEvents.length - 2];
            final pastEventName = pastEvent['name'];
            final pastEventDate =
            DateTime.fromMillisecondsSinceEpoch(pastEvent['date']);
            final pastEventLocation = pastEvent['location'];
            final formattedDate = dateTimeFormat.format(pastEventDate);

            return Container(
              margin: const EdgeInsets.all(8.0),
              decoration: BoxDecoration(
                color: Colors.grey.withOpacity(0.2),
                borderRadius: BorderRadius.circular(8.0),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.2),
                    spreadRadius: 2,
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: ListTile(
                title: Text(pastEventName),
                subtitle: Text(pastEventLocation),
                trailing: Text(formattedDate),
              ),
            );
          }
        },
      ),
    );
  }
}
