import QtQuick 2.15
import QtQuick.Controls 2.15

ApplicationWindow {
    visible: true
    width: 640
    height: 480
    title: "Projectile V2"

    Column {
        anchors.centerIn: parent

        Text {
            text: "Welcome to Projectile V2"
            font.pointSize: 24
            horizontalAlignment: Text.AlignHCenter
        }

        Button {
            text: "Click Me"
            onClicked: {
                console.log("Button clicked")
            }
        }
    }
}