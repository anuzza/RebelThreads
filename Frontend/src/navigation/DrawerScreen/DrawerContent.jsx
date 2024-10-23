import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import CustomDrawerItem from "../../components/CustomDrawerItem";
import { useDispatch } from "react-redux";
import { signout } from "../../redux/actions/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";

export const DrawerContent = (props) => {
  const user = props.user;
  const isAdmin = user && user.isAdmin === true;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signOut = () => {
    dispatch(signout(navigation));
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.push("ProfileScreen");
                  props.navigation.toggleDrawer();
                }}
              >
                <Avatar.Image
                  source={{
                    uri:
                      user && user.avatar
                        ? user.avatar
                        : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
                  }}
                  size={50}
                />
              </TouchableOpacity>

              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{user && user.name}</Title>
                <Caption style={styles.caption}>
                  @{user && user.email.split("@")[0]}
                </Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            {!isAdmin ? (
              <>
                <CustomDrawerItem
                  iconName="home"
                  label="Home"
                  onPress={() => {
                    props.navigation.navigate("Home Tab", {
                      screen: "Home",
                    });
                  }}
                />
                <CustomDrawerItem
                  iconName="heart"
                  label="Saved"
                  onPress={() => {
                    props.navigation.push("BookmarksScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
                <CustomDrawerItem
                  iconName="hanger"
                  label="My Listings"
                  onPress={() => {
                    props.navigation.push("MyListingScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
                <CustomDrawerItem
                  iconName="dresser"
                  label="My Requests"
                  onPress={() => {
                    props.navigation.push("MyRequestScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
                <CustomDrawerItem
                  iconName="account"
                  label="My Profile"
                  onPress={() => {
                    props.navigation.push("ProfileScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
              </>
            ) : (
              <>
                <CustomDrawerItem
                  iconName="home"
                  label="Home"
                  onPress={() => {
                    props.navigation.navigate("HomeTab", {
                      screen: "Home",
                    });
                  }}
                />
                <CustomDrawerItem
                  iconName="account"
                  label="My Profile"
                  onPress={() => {
                    props.navigation.push("ProfileScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
                <CustomDrawerItem
                  iconName="tag"
                  label="Reported Sales"
                  onPress={() => {
                    props.navigation.push("ReportedSalesScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
                <CustomDrawerItem
                  iconName="archive-eye"
                  label="Reported Requests"
                  onPress={() => {
                    props.navigation.push("ReportedRequestsScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
                <CustomDrawerItem
                  iconName="account-group"
                  label="Reported Users"
                  onPress={() => {
                    props.navigation.push("ReportedUsersScreen");
                    props.navigation.toggleDrawer();
                  }}
                />
              </>
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <CustomDrawerItem
          iconName="logout"
          label="Sign Out"
          onPress={signOut}
        />
      </Drawer.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
