import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, addDoc, updateDoc, FieldValue, getDoc } from "firebase/firestore/lite";
import { useUser } from '@clerk/clerk-react'; // Clerk hook to get user info

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVkh1GX4QdK5LkENuCaF_UDLCpCJ74RTM",
  authDomain: "dhan-niti.firebaseapp.com",
  projectId: "dhan-niti",
  storageBucket: "dhan-niti.firebasestorage.app",
  messagingSenderId: "442621457251",
  appId: "1:442621457251:web:fe336b1dd515c7d1721956",
  measurementId: "G-H8KJX2EML6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch the list of courses with chapters from Firestore
export const getCourseList = async () => {
  try {
    const courseRef = collection(db, "Courses");
    const courseDocs = await getDocs(courseRef);

    const courses = await Promise.all(
      courseDocs.docs.map(async (doc) => {
        const data = doc.data();
        const chaptersRef = collection(doc.ref, "chapters");
        const chapterDocs = await getDocs(chaptersRef);
        const chapters = chapterDocs.docs.map(chapter => chapter.data());
        return {
          id: doc.id,
          ...data,
          chapters, // Add chapters to the course object
        };
      })
    );

    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Fetch enrolled courses and completed chapters for a user
export const getUserEnrolledCourses = async (userId) => {
  try {
    const userEnrollmentsRef = collection(db, "Users", userId, "enrollments");
    const enrollmentDocs = await getDocs(userEnrollmentsRef);

    if (enrollmentDocs.empty) {
      console.log("No enrollments found for the user.");
      return { enrollments: [] };
    }

    const enrollments = await Promise.all(
      enrollmentDocs.docs.map(async (enrollmentDoc) => {
        const enrollmentData = enrollmentDoc.data();
        const courseRef = doc(db, "Courses", enrollmentData.courseId);
        const courseDoc = await getDoc(courseRef); // Fetching course details as a single doc
        
        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          const chaptersRef = collection(courseRef, "chapters");
          const chapterDocs = await getDocs(chaptersRef);
          const chapters = chapterDocs.docs.map(chapter => chapter.data());

          return {
            courseId: enrollmentDoc.id,
            courseName: courseData?.courseName || "Unknown", // Handle case where course name is missing
            courseDescription: courseData?.courseDescription || "No description",
            enrollmentDate: enrollmentData.enrollmentDate?.toDate(), // Convert Firestore timestamp to JS Date
            status: enrollmentData.status,
            completedChapters: enrollmentData.completedChapters || [], // Default empty array
            totalChapters: chapters.length, // Total chapters in the course
            chapters, // Include chapters here for the enrolled course
          };
        } else {
          console.warn(`Course with ID ${enrollmentData.courseId} not found.`);
          return { courseId: enrollmentDoc.id, courseName: "Unknown Course", chapters: [] };
        }
      })
    );

    console.log("User enrolled courses and completed chapters:", enrollments);
    return { enrollments };
  } catch (error) {
    console.error("Error fetching user enrollments:", error.message);
    return { enrollments: [] };
  }
};

// Enroll the user in a course
export const enrollCourse = async (courseId, userId) => {
  try {
    const userRef = doc(db, "Users", userId);
    const enrollmentsRef = collection(userRef, "enrollments");

    // Add course enrollment information to Firestore
    await addDoc(enrollmentsRef, {
      courseId,
      enrollmentDate: new Date(),  // Use JavaScript's Date object for the current timestamp
      status: 'enrolled', // Example of enrollment status, can be customized
      completedChapters: [], // Default to empty array of completed chapters
    });

    console.log(`User ${userId} successfully enrolled in course ${courseId}`);
    return { success: true };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

// Mark chapter as completed for a user
export const markChapterAsCompleted = async (userId, courseId, chapterId) => {
  try {
    const enrollmentRef = doc(db, "Users", userId, "enrollments", courseId);

    // Update the completedChapters array with the new chapter ID
    await updateDoc(enrollmentRef, {
      completedChapters: FieldValue.arrayUnion(chapterId), // Add chapterId to array if not already present
    });

    console.log(`Chapter ${chapterId} marked as completed for course ${courseId}.`);
  } catch (error) {
    console.error("Error updating completed chapters:", error.message);
  }
};

